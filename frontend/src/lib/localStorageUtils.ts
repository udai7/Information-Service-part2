// Temporary stub for localStorage functions
// These functions return empty data since we're now using API

export const getServices = () => {
  return [];
};

export const getServiceByName = (_name: string) => {
  return null;
};

export const saveService = (service: any) => {
  console.warn(
    "saveService called but localStorage is deprecated. Use API instead.",
  );
  return service;
};

export const updateService = (service: any) => {
  console.warn(
    "updateService called but localStorage is deprecated. Use API instead.",
  );
  return service;
};

export const deleteService = (_id: string | number) => {
  console.warn(
    "deleteService called but localStorage is deprecated. Use API instead.",
  );
  return true;
};

export const getServiceById = (_id: string | number) => {
  console.warn(
    "getServiceById called but localStorage is deprecated. Use API instead.",
  );
  return null;
};

export const getAllServices = () => {
  console.warn(
    "getAllServices called but localStorage is deprecated. Use API instead.",
  );
  return [];
};
