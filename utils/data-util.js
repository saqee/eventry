export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      }
    })
    .map(({ _id, ...rest }) => rest)
  return mappedArray
}

export const replaceWithObj = (obj) => {
  const { _id, ...updateObj } = { ...obj, id: obj._id.toString() }
  return updateObj
}
