const makeHeaderStyle = title => {
  return {
    headerStyle: {
      backgroundColor: '#0f4c75',
    },
    title: title,
    headerTitleStyle: {
      textAlign: 'center',
      color: '#00b7c2',
    },
  };
};
const HomeHeaderStyle = {
  headerStyle: {
    backgroundColor: '#0f4c75',
  },
  title: 'Hisab Kital',
  headerTitleStyle: {
    textAlign: 'center',
    color: '#00b7c2',
  },
};

const LoginHeaderStyle = {
  headerStyle: {
    backgroundColor: 'green',
  },
  title: 'Hisab Kital',
  headerTitleStyle: {
    textAlign: 'center',
    color: '#00b7c2',
  },
};

export {HomeHeaderStyle, LoginHeaderStyle, makeHeaderStyle};
