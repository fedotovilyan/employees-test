export const phoneMaskInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D+/g, "");
  const numberLength = 11;

  let result = '+';

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
			case 1:
				result += " (";
        break;
      case 4:
        result += ") ";
        break;
      case 7:
        result += "-";
        break;
      case 9:
        result += "-";
        break;
      default:
        break;
    }
    result += value[i];
  }

  e.target.value = result;
};