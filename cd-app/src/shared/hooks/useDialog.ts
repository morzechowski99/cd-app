import { useState } from "react";

export const useDialog = (
   initialState: boolean = false
): [boolean, () => void, () => void, () => void] => {
   const [isDialogOpen, setIsDialogOpen] = useState(initialState);
   const openDialog = () => setIsDialogOpen(true);
   const closeDialog = () => setIsDialogOpen(false);
   const toggleDialog = () => setIsDialogOpen((open) => !open);
   return [isDialogOpen, openDialog, closeDialog, toggleDialog];
};
