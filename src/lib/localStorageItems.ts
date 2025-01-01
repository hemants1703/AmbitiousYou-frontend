/*
    This file contains the list of items that are stored in the local storage.
    This is used to clear all the items in the local storage when the user deletes their account.
    In order to make sure only the localStorage items created by this app are deleted, we need to keep track of all the items that are stored in the local storage.
*/

const localStorageItems = ['displayAddAmbitionModal'];
export default localStorageItems;
