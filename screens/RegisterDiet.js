import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const RegisterDiet = () => {
  const [trainerId, setTrainerId] = useState('');
  const [dietId, setDietId] = useState('');

  const registerDiet = async () => {
    try {
      await fetch('http://your-backend-url/register-diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainer_id: trainerId,
          diet_id: dietId,
        }),
      });
      alert('Diet registered successfully.');
    } catch (error) {
      console.error("Failed to register diet:", error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Trainer ID"
        value={trainerId}
        onChangeText={setTrainerId}
      />
      <TextInput
        placeholder="Diet ID"
        value={dietId}
        onChangeText={setDietId}
      />
      <Button title="Register Diet" onPress={registerDiet} />
    </View>
  );
};

export default RegisterDiet;
