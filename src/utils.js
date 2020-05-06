export const formatDateHelper = (date) => {
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
}
