export default function setTagsForRequest(data) {
  const result = { ...data }
  result.tags.tags = Object.keys(data).map((elem, index) => {
    if (elem.match(/tags/g)) return Object.values(data)[index]
    return null
  }).filter(elem => elem)
}
