/**
 * https://tailwindcss.com/docs/theme#configuration-reference
 */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true
  },
  purge: false,
  darkMode: false, // or 'media' or 'class'

  theme: {
    screens: {
      md: { max: '961px' }
    },
    // To override an option in the default theme,
    // add your overrides directly under the theme section of your tailwind.config.js:
    // opacity: {},

    // If you'd like to preserve the default values for a theme option but also add new values,
    // add your extensions under the extend key in the theme section of your configuration file.
    extend: {
      transitionProperty: {
        width: 'width'
      },
      opacity: {
        '012': '0.12'
      },
      cursor: {
        grob: 'grab'
      },
      height: {
        '1px': '1px',
        '3px': '3px',
        '5px': '5px',
        '6px': '6px',
        '9px': '9px',
        '14px': '14px',
        '15px': '15px',
        '18px': '18px',
        '20px': '20px',
        '23px': '23px',
        '24px': '24px',
        '25px': '25px',
        '26px': '26px',
        '28px': '28px',
        '30px': '30px',
        '33px': '33px',
        '36px': '36px',
        '40px': '40px',
        '41px': '41px',
        '42px': '42px',
        '45px': '45px',
        '50px': '50px',
        '54px': '54px',
        '60px': '60px',
        '70px': '70px',
        '90px': '90px',
        '109px': '109px',
        '125px': '125px',
        '167px': '167px',
        '185px': '185px',
        '186px': '186px',
        '310px': '310px',
        '326px': '326px',
        '380px': '380px',
        '500px': '500px'
      },
      width: {
        '1px': '1px',
        '9px': '9px',
        '12px': '12px',
        '14px': '14px',
        '15px': '15px',
        '18px': '18px',
        '20px': '20px',
        '23px': '23px',
        '25px': '25px',
        '30px': '30px',
        '31px': '31px',
        '33px': '33px',
        '40px': '40px',
        '45px': '45px',
        '50px': '50px',
        '60px': '60px',
        '70px': '70px',
        '80px': '80px',
        '82px': '82px',
        '115px': '115px',
        '153px': '153px',
        '167px': '167px',
        '185px': '185px',
        '211px': '211px',
        '240px': '240px',
        '245px': '245px',
        '249px': '249px',
        '310px': '310px',
        '300px': '300px',
        '346px': '346px'
      },
      borderRadius: {
        '2px': '2px',
        '4px': '4px',
        '10px': '10px',
        '20px': '20px',
        '50px': '50px'
      },
      padding: {
        '3px': '3px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        '10px': '10px',
        '12px': '12px',
        '13px': '13px',
        '15px': '15px',
        '16px': '16px',
        '17px': '17px',
        '18px': '18px',
        '19px': '19px',
        '20px': '20px',
        '30px': '30px',
        '34px': '34px',
        '36px': '36px',
        '40px': '40px',
        '43px': '43px',
        '60px': '60px',
        '100px': '100px'
      },
      margin: {
        '1px': '1px',
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '10px': '10px',
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '14px': '14px',
        '15px': '15px',
        '18px': '18px',
        '20px': '20px',
        '24px': '24px',
        '-24px': '-24px',
        '40px': '40px',
        '23px': '23px',
        '34px': '34px',
        '60px': '60px',
        '-1/2': '-50%',
        '25px': '25px',
        '240px': '240px'
      },
      fontSize: {
        '12px': '12px',
        '14px': '14px',
        '16px': '16px',
        '18px': '18px',
        '20px': '20px',
        '24px': '24px'
      },
      textColor: {
        'color-primary': 'var(--color-primary)',
        'color-primary-disable': 'var(--color-primary-disable)',
        'color-quaternary': 'var(--color-quaternary)',
        'color-quinary': 'var(--color-quinary)',
        'color-quinary-disable': 'var(--color-quinary-disable)',
        'color-tertiary-070': 'var(--color-tertiary-070)',
        'color-senary': 'var(--color-senary)',
        'color-tertiary-1': 'var(--color-tertiary-1)',
        'color-error': 'var(--color-error)',
        'color-denary': 'var(--color-denary)',
        'color-primary-gloomy': 'var(--color-primary-gloomy)',
        'color-primary-warning': 'var(--color-primary-warning)'
      },
      minWidth: {
        '50px': '50px'
      },
      minHeight: {
        '37px': '37px',
        '50px': '50px',
        '105px': '105px'
      },
      maxHeight: {
        '380px': '380px'
      },
      borderWidth: {
        '1px': '1px',
        '7px': '7px'
      },
      boxShadow: {
        avatar: '0 0 0 2px var(--color-primary)'
      },
      borderColor: {
        'color-primary': 'var(--color-primary)',
        'color-error': 'var(--color-error)',
        'color-denary-008': 'var(--color-denary-008)',
        'color-denary-018': 'var(--color-denary-018)',
        'color-primary-gloomy': 'var(--color-primary-gloomy)',
        'color-primary-warning': 'var(--color-primary-warning)',
        'color-denary-012': 'var(--color-denary-012)',
        'color-senary-light': 'var(--color-senary-light)'
      },
      lineHeight: {
        '18px': '18px',
        '21px': '21px',
        '24px': '24px',
        '26px': '26px',
        '33px': '33px',
        '36px': '36px',
        '45px': '45px',
        '50px': '50px',
        '54px': '54px'
      },
      backgroundColor: {
        'color-denary-008': 'var(--color-denary-008)',
        'color-primary': 'var(--color-primary)',
        'color-primary-disable': 'var(--color-primary-disable)',
        'color-tertiary': 'var(--color-tertiary)',
        'color-tertiary-070': 'var(--color-tertiary-070)',
        'color-tertiary-020': 'var(--color-tertiary-020)',
        'color-senary': 'var(--color-senary)',
        'color-nonary': 'var(--color-nonary)',
        'color-tertiary-1': 'var(--color-tertiary-1)',
        'color-quinary': 'var(--color-quinary)',
        'color-quinary-disable': 'var(--color-quinary-disable)',
        'color-septenary': 'var(--color-septenary)',
        'color-quaternary': 'var(--color-quaternary)',
        'color-denary': 'var(--color-denary)',
        'color-octonary': 'var(--color-octonary)',
        'color-denary-012': 'var(--color-denary-012)',
        'color-denary-020': 'var(--color-denary-020)',
        'color-gray-acitve': 'var(--color-gray-acitve)',
        'color-primary-gloomy': 'var(--color-primary-gloomy)',
        'color-primary-warning': 'var(--color-primary-warning)'
      },
      backgroundImage: {
        'progess-bar': 'linear-gradient(-45deg, #19AE5A 0%, #076CA3 100%);'
      },
      zIndex: {
        '-1': '-1',
        1: '1'
      },
      inset: {
        '5px': '5px',
        '8px': '8px',
        '10px': '10px',
        '12px': '12px',
        '15px': '15px',
        '17px': '17px',
        '20px': '20px',
        '22px': '22px',
        '31px': '31px',
        '34px': '34px',
        '50px': '50px',
        '120px': '120px',
        '240px': '240px',
        '2/5': '40%',
        '3/5': '60%'
      },
      translate: {
        '15px': '15px',
        '20px': '20px',
        '30px': '30px'
      },
      ringColor: {
        'color-primary': 'var(--color-primary)'
      },
      flex: {
        '1-auto': '1 0 auto'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
