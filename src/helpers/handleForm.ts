export const onErrorsHandler = async (errors: any) => {
  try {
    if (errors[Object.keys(errors)[0]]?.ref?.select) {
      errors[Object.keys(errors)[0]].ref.select();
    }
  } catch (err) {
    console.log(err);
  }
};
