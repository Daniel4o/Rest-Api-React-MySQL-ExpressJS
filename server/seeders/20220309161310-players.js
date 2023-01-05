'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('players', [
      // Man United
      {
      teamId: '1',
      name: 'David de Gea',
      position: 'Goalkeeper',
      age: '33'
    },{
      teamId: '1',
      name: 'Ronaldo',
      position: 'Attacker',
      age: '37'
    },
    {
      teamId: '1',
      name: 'Berbatov',
      position: 'Attacker',
      age: '40'
    },
    {
      teamId: '1',
      name: 'Harry Maguire',
      position: 'Defender',
      age: '31'
    },
    {
      teamId: '1',
      name: 'Evra',
      position: 'Defender',
      age: '37'
    },
    {
      teamId: '1',
      name: 'Shaw',
      position: 'Defender',
      age: '29'
    },
    {
      teamId: '1',
      name: 'Wan-Bissaka',
      position: 'Defender',
      age: '28'
    },
    {
      teamId: '1',
      name: 'Pogba',
      position: 'Middfielder',
      age: '30'
    },
    {
      teamId: '1',
      name: 'Fernandes',
      position: 'Middfielder',
      age: '31'
    },
    {
      teamId: '1',
      name: 'Christian Eriksen',
      position: 'Middfielder',
      age: '34'
    },
    {
      teamId: '1',
      name: 'Casemiro',
      position: 'Middfielder',
      age: '30'
    },


    //Liverpool

    {
      teamId: '2',
      name: 'Alisson',
      position: 'Goalkeeper',
      age: '33'
    },
    {
      teamId: '2',
      name: 'van Dijk',
      position: 'Defender',
      age: '30'
    },
    {
      teamId: '2',
      name: 'Alexander-Arnold',
      position: 'Defender',
      age: '26'
    },
    {
      teamId: '2',
      name: 'Robertson',
      position: 'Defender',
      age: '33'
    },
    {
      teamId: '2',
      name: 'Konate',
      position: 'Defender',
      age: '32'
    },
    {
      teamId: '2',
      name: 'Tsimikas',
      position: 'Defender',
      age: '34'
    },
    {
      teamId: '2',
      name: 'Henderson',
      position: 'Middfielder',
      age: '32'
    },
    {
      teamId: '2',
      name: 'Elliott',
      position: 'Middfielder',
      age: '27'
    },
    {
      teamId: '2',
      name: 'Fabinho',
      position: 'Middfielder',
      age: '32'
    },
    {
      teamId: '2',
      name: 'Thiago',
      position: 'Middfielder',
      age: '34'
    },
    {
      teamId: '2',
      name: 'M. Salah',
      position: 'Attacker',
      age: '32'
    },
    {
      teamId: '2',
      name: 'Darwin Nunez',
      position: 'Attacker',
      age: '28'
    },

    // Chelsea

    {
      teamId: '3',
      name: 'Kepa',
      position: 'Goalkeeper',
      age: '28'
    }, {
      teamId: '3',
      name: 'Thiago Silva',
      position: 'Defender',
      age: '30'
    }, {
      teamId: '3',
      name: 'Cuccurella',
      position: 'Defender',
      age: '28'
    }, {
      teamId: '3',
      name: 'Koulibaly',
      position: 'Defender',
      age: '30'
    }, {
      teamId: '3',
      name: 'Azpillicueta',
      position: 'Defender',
      age: '34'
    },
    {
      teamId: '3',
      name: 'Hakim Ziyech',
      position: 'Middfielder',
      age: '26'
    }, {
      teamId: '3',
      name: 'Jorginho',
      position: 'Middfielder',
      age: '29'
    }, {
      teamId: '3',
      name: 'Pulisic',
      position: 'Middfielder',
      age: '23'
    }, {
      teamId: '3',
      name: 'Mason Mount',
      position: 'Middfielder',
      age: '24'
    }, {
      teamId: '3',
      name: 'Kai Havertz',
      position: 'Attacker',
      age: '24'
    }, {
      teamId: '3',
      name: 'Sterling',
      position: 'Attacker',
      age: '28'
    },

    {
      teamId: '4',
      name: 'Kane',
      position: 'Attacker',
      age: '29'
    }, {
      teamId: '4',
      name: 'Hugo Lloris',
      position: 'Goalkeeper',
      age: '33'
    }, {
      teamId: '5',
      name: 'Phil Foden',
      position: 'Middfielder',
      age: '22'
    }, {
      teamId: '5',
      name: 'Ederson',
      position: 'Goalkeeper',
      age: '31'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('players', null, {});
  }
};
