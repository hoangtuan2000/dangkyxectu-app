import React from 'react';
import {Text, View} from 'react-native';
import MultiSelectBox from '../../components/multiSelectBox/MultiSelectBox';

const K_OPTIONS = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },

  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
];

function RentedCarPage() {
  const [selectedTeams, setSelectedTeams] = React.useState([]);

  console.log('selectedTeams', selectedTeams);

  return (
    <View>
      <MultiSelectBox
        data={K_OPTIONS}
        label='test'
        inputPlaceholder={'test placeholder'}
        onMultiChange={(value) => console.log('value', value)}
      />
    </View>
  );
}

export default RentedCarPage;
