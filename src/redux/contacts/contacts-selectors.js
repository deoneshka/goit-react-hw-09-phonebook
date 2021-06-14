import { createSelector } from '@reduxjs/toolkit';

export const getLoading = state => state.contacts.loading;

export const getFilter = state => state.contacts.filter;

export const getAllContacts = state => state.contacts.items;

export const getVisibleContacts = createSelector(
    [getAllContacts, getFilter], (allContacts, filter) => {
        const normalizedFilter = filter.toLowerCase();
        
        return allContacts.filter(({ name }) =>
            name.toLowerCase().includes(normalizedFilter));
    }
);