import { StyleSheet } from 'react-native';

import { lu, width } from '../../../modules/utils/unit';

let styles = StyleSheet.create({
  userInputItem: {
    height: 88 * lu,
    paddingLeft: 30 * lu,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 2 * lu,
    borderTopColor: '#f2f2f2',
    backgroundColor: '#fff',
    marginTop: 4 * lu,
    borderRadius: 8 * lu,
  },
  TextInput: {
    height: 88 * lu,
    width: width - 118 * lu,
    position: 'absolute',
    left: 88 * lu,
    fontSize: 28 * lu,
    color: '#686868'
  }
})

export { styles };

