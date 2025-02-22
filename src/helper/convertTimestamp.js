const convertTimestamp = async (firebaseTimestamp) => {
  if (!firebaseTimestamp) return null;
  return firebaseTimestamp.toDate();
};

export default convertTimestamp;
