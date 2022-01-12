export const updateArray = (currentList, newItem) => {
	let updatedList = currentList;

	const itemIndex = currentList.findIndex((item) => item._id === newItem._id);

	updatedList.splice(itemIndex, 1, newItem);

	return updatedList;
};

export const removeItemFromArray = (currentList, newItem) => {
	let updatedList = currentList;

	updatedList = updatedList.filter((item) => item._id !== newItem._id);

	return updatedList;
};
