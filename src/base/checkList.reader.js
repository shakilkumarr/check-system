const _property = keyToFetch => data => data[keyToFetch];

export const description = _property('description');
export const id = _property('id');
export const priority = _property('priority');
