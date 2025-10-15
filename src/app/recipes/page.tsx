'use client';

import React from 'react';
import NewRecipeForm from '../../Components/NewRecipe/newRecipe';
import { getCurrentUserRole } from '../../Helpers/auth-helpers';

export default function NewRecipePage() {
  const [isAdminUser, setIsAdminUser] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const userRole = await getCurrentUserRole();
      if (userRole === 'admin') {
        console.log('Admin user detected');
        setIsAdminUser(true);
      } else {
        console.log('Non-admin or no user detected');
      }
    })();
  }, []);
  return (
    <div className="flex justify-center mt-10">
      {isAdminUser ? <NewRecipeForm /> : <h2 className="text-2xl text-red-600">You do not have permission to view this page.</h2> }

    </div>
  );
}
