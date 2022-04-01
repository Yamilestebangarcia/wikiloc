const validationEmail = (email) => {
  const regEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regEmail.test(email);
};
const validationPass = (pass) => {
  const regPass = /^[a-zA-Z0-9]{8,16}$/;
  return regPass.test(pass);
};
const validationName = (name) => {
  const regPass = /^[a-zA-ZñÑ(\s)]{2,16}$/;
  return regPass.test(name);
};
const validationFile = (file) => {
  const regFile = /.gpx$/i;
  return regFile.test(file);
};
const validationDifficulty = (difficulty) => {
  const regDifficulty = /easy|medium|hard/;
  return regDifficulty.test(difficulty);
};
const validationDescription = (description) => {
  const regDescription =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/g;
  return regDescription.test(description);
};
const validationDate = (date) => {
  const regDate =
    /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[-](?:0?[1-9]|1[0-2])|(?:29|30)[-](?:0?[13-9]|1[0-2])|31[-](?:0?[13578]|1[02]))[-](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[-]0?2[-](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
  return regDate.test(date);
};
const validationDistance = (distance) => {
  const regDistance = /^[0-9]{1,3}$|^[0-9]{1,3}\.[0-9]{1,3}$/;
  return regDistance.test(distance);
};
const validationSlope = (slope) => {
  const regSlope = /^[0-9]{1,5}$/;
  return regSlope.test(slope);
};

const validationCords = (cord) => {
  const regCord = /^(-?\d{1,5})(\.\d{1,30})?$/;
  return regCord.test(cord);
};
export {
  validationEmail,
  validationPass,
  validationName,
  validationFile,
  validationDifficulty,
  validationDescription,
  validationDate,
  validationDistance,
  validationSlope,
  validationCords,
};
