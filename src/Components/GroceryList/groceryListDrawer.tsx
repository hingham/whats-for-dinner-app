/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material';
import { Deselect } from '@mui/icons-material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../Store/rootReducer';
// import pantryItems from '../../Data/Ingredients/pantryItems.json';
import { updateIngredientStocked, removeSelectedRecipe } from '../../Store/recipesSlice';
import { getSelectedRecipes } from '../../Store/reselect';
import { Recipe, UserRecipe } from '../../Models/recipe';
import RecipeDialog from '../RecipeDialog/recipeDialog'; // Import your RecipeDialog component

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GroceryList = Record<string, any>
// const pantryItemsParsed = JSON.parse(JSON.stringify(pantryItems));

const drawerWidth = 340;

const getListData = (recipe: UserRecipe, list: GroceryList) => {
  recipe.ingredients.forEach((ingredient) => {
    const { item } = ingredient;
    const isStocked = ingredient.stocked;
    if (isStocked) {
      const { stocked, ...rest } = list;
      if (stocked[item]) {
        stocked[item] = {
          amount: stocked[item].amount + ingredient.userAmountUS,
          measurement: ingredient.measurementUS ? ingredient.measurementUS : '', // This needs to be edited to account for different measurements
          recipe: [...stocked[item].recipe, recipe.name],
          recipeIds: [...stocked[item].recipeIds, recipe.id],
          checked: true,
        };
      } else {
        stocked[item] = {
          amount: ingredient.userAmountUS,
          measurement: ingredient.measurementUS ? ingredient.measurementUS : '',
          recipe: [recipe.name],
          recipeIds: [recipe.id],
          checked: true,
        };
      }
    } else {
      const { grocery, ...rest } = list;
      if (grocery[item]) {
        grocery[item] = {
          amount: grocery[item].amount + ingredient.userAmountUS,
          measurement: ingredient.measurementUS ? ingredient.measurementUS : '', // This needs to be edited to account for different measurements
          recipe: [...grocery[item].recipe, recipe.name],
          recipeIds: [...grocery[item].recipeIds, recipe.id],
          checked: false,
        };
      } else {
        grocery[item] = {
          amount: ingredient.userAmountUS,
          measurement: ingredient.measurementUS ? ingredient.measurementUS : '',
          recipe: [recipe.name],
          recipeIds: [recipe.id],
          checked: false,
        };
      }
    }
  });
};

export default function ResponsiveGroceryListDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [showRecipes, setShowRecipes] = React.useState(true);
  const [showGroceryList, setShowGroceryList] = React.useState(true);
  const [showStocked, setShowStocked] = React.useState(true);
  const [individualRecipe, setIndividualRecipe] = React.useState<UserRecipe | null>(null);
  const [openRecipeDialog, setOpenRecipeDialog] = React.useState(false);
  const [selectedRecipeForDialog, setSelectedRecipeForDialog] = React.useState<Recipe | null>(null);

  const handleOpenRecipeDialog = (recipe: Recipe) => {
    setSelectedRecipeForDialog(recipe);
    setOpenRecipeDialog(true);
  };

  const handleCloseRecipeDialog = () => {
    setOpenRecipeDialog(false);
    setSelectedRecipeForDialog(null);
  };

  const dispatch = useDispatch();

  const selectedRecipes = useSelector((state: RootState) => getSelectedRecipes(state));

  const getGroceryList = (): GroceryList => {
    const list: GroceryList = {
      stocked: {},
      grocery: {},
    };

    if (individualRecipe) {
      // TODO: feels a bit odd to store the whole individual recipe here
      getListData(individualRecipe, list);
    } else {
      selectedRecipes.forEach((recipe) => {
        getListData(recipe, list);
      });
    }

    return list;
  };

  const [groceryList, setGroceryList] = React.useState<GroceryList>(getGroceryList());

  const handleIndividualRecipeClick = (recipe: UserRecipe) => {
    if (individualRecipe && individualRecipe.id === recipe.id) {
      // Something is out of sync here...
      setIndividualRecipe(null);
    } else {
      setIndividualRecipe(recipe);
    }
  };

  useEffect(() => {
    setGroceryList(getGroceryList());
  }, [selectedRecipes, individualRecipe]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleShowRecipes = () => {
    setShowRecipes(!showRecipes);
  };

  const handleCheckboxToggle = (recipeIds: string[], item: string, category: 'grocery' | 'stocked') => {
    // const updatedGroceryList = { ...groceryList };
    dispatch(updateIngredientStocked({
      recipeIds,
      item,
      stocked: !groceryList[category][item].checked,
    }));
  };

  // Update recipe to dispatch an "unselect" action for the recipe
  const handleDeselectRecipe = (recipeId: string) => {
    dispatch(removeSelectedRecipe(recipeId));
  };

  const downloadAsTextFile = () => {
    const listItems = Object.keys(groceryList.grocery).map((item) => {
      const { amount, measurement } = groceryList.grocery[item];
      return `${item} ${amount} ${measurement}`;
    });
    const blob = new Blob([listItems.join('\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grocery_list.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <List>
        <ListItem onClick={() => setShowRecipes(!showRecipes)}>
          <ListItemText primary="Recipes & Shopping List" />
        </ListItem>
        {showRecipes && selectedRecipes.map((recipe) => (
          <ListItem
            key={recipe.id}
            disablePadding
            sx={{
              backgroundColor: individualRecipe && individualRecipe.id === recipe.id ? 'var(--neutral-gray)' : 'none',
            }}

          >
            <ListItemButton>
              <ListItemIcon onClick={() => handleDeselectRecipe(recipe.id)} sx={{ cursor: 'pointer' }}>
                <Deselect />
              </ListItemIcon>
              <ListItemText
                primary={recipe.name}
                onClick={() => handleIndividualRecipeClick(recipe)}
              />
              <ListItemIcon onClick={() => handleOpenRecipeDialog(recipe)} sx={{ cursor: 'pointer' }}>
                <ArrowForward />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem onClick={() => setShowGroceryList(!showGroceryList)}>
          <ListItemText primary="Grocery - Check to mark as stocked" />
        </ListItem>
        {showGroceryList && Object.keys(groceryList.grocery).map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon onClick={() => handleCheckboxToggle(groceryList.grocery[item].recipeIds, item, 'grocery')}>
                <Checkbox
                  checked={groceryList.grocery[item].checked}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText
                primary={`${item} ${groceryList.grocery[item].amount} ${groceryList.grocery[item].measurement}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText onClick={() => setShowStocked(!showStocked)} primary="Stocked - Uncheck to add to grocery list" />
        </ListItem>
        {showStocked && Object.keys(groceryList.stocked).map((item) => (
          <ListItem key={item} disablePadding onClick={() => handleCheckboxToggle(groceryList.stocked[item].recipeIds, item, 'stocked')}>
            <ListItemButton>
              <ListItemIcon>
                <Checkbox
                  checked={groceryList.stocked[item].checked}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={`${item} ${groceryList.stocked[item].amount} ${groceryList.stocked[item].measurement}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <button
        type="button"
        onClick={() => downloadAsTextFile()}
      >
        Download as Text
      </button>
      {selectedRecipeForDialog && (
        <RecipeDialog
          open={openRecipeDialog}
          modalRecipeId={selectedRecipeForDialog.id}
          handleClose={handleCloseRecipeDialog}
          setModalRecipeId={() => { }}
        />
      )}
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar sx={{
          display: {
            lg: 'flex', md: 'flex', sm: 'flex', xs: 'flex',
          },
        }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'block', md: 'block', sm: 'block' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: {
              xs: 'block', sm: 'block', md: 'block', lg: 'block',
            },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* <Drawer
          variant="permanent"
          sx={{
            display: {
              xs: 'none', sm: 'none', md: 'none', lg: 'block',
            },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer> */}
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
