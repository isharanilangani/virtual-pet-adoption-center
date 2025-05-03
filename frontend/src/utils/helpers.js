import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';

// Map moods to icons
export const moodIcons = {
  Happy: <FaSmile className="text-success" />,
  Excited: <FaMeh className="text-warning" />,
  Sad: <FaFrown className="text-danger" />
};

// Get mood icon based on the mood
export const getMoodIcon = (mood) => {
  return moodIcons[mood] || <FaMeh className="text-secondary" />;
};

// Get mood color class
export const getMoodColor = (mood) => {
  switch (mood) {
    case 'Happy': return 'success';
    case 'Excited': return 'warning';
    case 'Sad': return 'danger';
    default: return 'secondary';
  }
};

// Sort pets by name (alphabetically)
export const sortPetsByName = (pets) => {
  return [...pets].sort((a, b) => a.name.localeCompare(b.name));
};


