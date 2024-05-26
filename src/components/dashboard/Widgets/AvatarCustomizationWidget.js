import React, { useState, useEffect } from 'react';

// Example assets for customization
const skinTones = ['#F5CBA7', '#E5AC76', '#B7793F', '#8A5735', '#603F28'];
const clothingOptions = [
  { id: 1, name: 'T-Shirt', color: '#FFFFFF' },
  { id: 2, name: 'Hoodie', color: '#000000' },
  { id: 3, name: 'Jacket', color: '#FF5733' }
];
const accessories = [
  { id: 1, name: 'Glasses' },
  { id: 2, name: 'Hat' },
  { id: 3, name: 'Watch' }
];

const AvatarCustomizationWidget = ({ onSave }) => {
  const [skinTone, setSkinTone] = useState(skinTones[0]);
  const [clothing, setClothing] = useState(clothingOptions[0]);
  const [accessory, setAccessory] = useState(accessories[0]);

  const handleSave = () => {
    const avatarSettings = {
      skinTone,
      clothing,
      accessory
    };
    onSave(avatarSettings);
  };

  useEffect(() => {
    // Any setup for the widget can go here
  }, []);

  return (
    <div className="widget avatar-customization">
      <h3>Avatar Customization</h3>
      <div>
        <h4>Skin Tone</h4>
        <div>
          {skinTones.map((tone, index) => (
            <div
              key={index}
              style={{
                backgroundColor: tone,
                width: '30px',
                height: '30px',
                display: 'inline-block',
                margin: '5px',
                border: skinTone === tone ? '2px solid #000' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => setSkinTone(tone)}
            ></div>
          ))}
        </div>
      </div>
      <div>
        <h4>Clothing</h4>
        <select
          value={clothing.id}
          onChange={(e) =>
            setClothing(
              clothingOptions.find((option) => option.id === parseInt(e.target.value))
            )
          }
        >
          {clothingOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>Accessories</h4>
        <select
          value={accessory.id}
          onChange={(e) =>
            setAccessory(
              accessories.find((item) => item.id === parseInt(e.target.value))
            )
          }
        >
          {accessories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSave}>Save Avatar</button>
    </div>
  );
};

export default AvatarCustomizationWidget;
