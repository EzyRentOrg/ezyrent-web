const STORAGE_KEY = 'property_listing_draft';

export const handleLocalStorage = {
  save: (formValues: PropertyFormData) => {
    const saveTimeout = setTimeout(() => {
      try {
        const saveData: Partial<PropertyFormData> = {
          ...formValues,
          primaryFile: null, // Don't save file data
          otherFiles: [] // Don't save file data
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  },

  load: (
    setValue: (
      field: keyof PropertyFormData,
      value: PropertyFormData[keyof PropertyFormData]
    ) => void
  ) => {
    try {
      const savedDraft = localStorage.getItem(STORAGE_KEY);
      if (savedDraft) {
        const parsedDraft: Partial<PropertyFormData> = JSON.parse(savedDraft);
        Object.entries(parsedDraft).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            setValue(key as keyof PropertyFormData, value);
          }
        });
      }
    } catch (error) {
      console.error('Error retrieving draft:', error);
    }
  }
};
