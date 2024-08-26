export const birthdayMaskInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D+/g, "");
  const birthdayLength = 8;

  let result = "";

  for (let i = 0; i < value.length && i < birthdayLength; i++) {
    switch (i) {
      case 2:
        result += ".";
        break;
      case 4:
        result += ".";
        break;
    }
    result += value[i];
  }

  e.target.value = result;
};