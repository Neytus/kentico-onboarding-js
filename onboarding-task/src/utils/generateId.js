const generateId = () => {
  return generate4() + generate4() + '-'
    + generate4() + '-'
    + generate4() + '-'
    + generate4() + '-'
    + generate4() + generate4() + generate4();
};

const generate4 = () => {
  let sGuid = '';
  for (let i = 0; i < 4; i++) {
    sGuid += Math.floor(Math.random() * 0xF).toString(0xF);
  }
  return sGuid;
};

export { generateId };
