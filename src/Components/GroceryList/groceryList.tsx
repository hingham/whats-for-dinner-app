/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// Renders a button on the meal plan view to generate a grocery list
// when the button is clicked, all "checked" recipes are added to the grocery list
// grocery list is generated and can be edited by user
// Option for user to send grocery list as pdf or export as some other list
import React from 'react';
import Button from '@mui/material/Button/Button';
import {
  Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/rootReducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GroceryList = Record<string, any>

function UserGroceryList(): React.ReactElement {
  const [showGroceryList, setShowGroceryList] = React.useState(false);
  const selectedRecipes = useSelector((state: RootState) => state.recipes.selected);

  const toggleGroceryList = () => {
    setShowGroceryList(!showGroceryList);
  };

  const getGroceryList = (): GroceryList => {
    const list: GroceryList = {};

    selectedRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (list[ingredient.item]) {
          list[ingredient.item] += ingredient.amountUS;
        } else {
          list[ingredient.item] = ingredient.amountUS;
        }
      });
    });

    return list;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groceryList: GroceryList = getGroceryList();

  if (selectedRecipes.length === 0) {
    return (
      <Typography variant="h5" component="h2" gutterBottom>
        No recipes selected
      </Typography>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {showGroceryList ? (
        <>
          <Button onClick={toggleGroceryList}>
            Hide Grocery List
          </Button>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {Object.entries(groceryList).map(([item, amount]) => {
              const labelId = `checkbox-list-label-${item}`;

              return (
                <ListItem
                  key={item}
                  secondaryAction={
                    (
                      <IconButton edge="end" aria-label="comments">
                        {/* <CommentIcon /> */}
                      </IconButton>
                    )
                  }
                  disablePadding
                >
                  {/* <ListItemButton role={undefined} onClick={handleToggle(value)} dense> */}
                  {/* <ListItemIcon> */}
                  {/* <Checkbox
                        edge="start"
                        checked={checked.includes(ingredient)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      /> */}
                  {/* </ListItemIcon> */}
                  <ListItemText id={labelId} primary={`${item}: ${amount}`} />
                  {/* </ListItemButton> */}
                </ListItem>
              );
            })}
          </List>
        </>
      ) : (
        <Button onClick={toggleGroceryList}>
          Show Grocery List
        </Button>
      )}
    </>
  );
}

export default UserGroceryList;
