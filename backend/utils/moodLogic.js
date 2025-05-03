const calculateMood = (createdAt, adoption_date) => {
  // If the pet is adopted, no mood is needed
  if (adoption_date) return null;

  const diffInMs = new Date() - new Date(createdAt);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays < 1) return 'Happy';
  if (diffInDays <= 3) return 'Excited';
  return 'Sad';
};

module.exports = { calculateMood };
