export const logGreeting = (name = 'user') => {
  let date = new Date();
  let hrs = date.getHours();
  let greeting;
  if (hrs < 12) greeting = `Good Morning, ${name}`;
  else if (hrs >= 12 && hrs <= 17) greeting = `Good Afternoon, ${name}`;
  else if (hrs >= 17 && hrs <= 24) greeting = `Good Evening, ${name}`;
  return greeting;
};
