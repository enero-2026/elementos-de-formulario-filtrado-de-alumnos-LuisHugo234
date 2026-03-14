import { FlatList, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { List, Text, Searchbar, Menu } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [buscaAlumno, setBuscaAlumno] = useState('');
  const [tipoOrden, setTipoOrden] = useState('apellido_asc');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAlumnos([
        { nombre: 'AGUILAR ORTIZ LUIS ROLANDO', matricula: '2121179' },
        { nombre: 'CANDELARIA MORA SAMANTHA', matricula: '2114354' },
        { nombre: 'CANTU SILVA JAVIER', matricula: '2111889' },
        { nombre: 'CARMONA LOZANO ANGEL EMILIANO', matricula: '2069119' },
        { nombre: 'CASTILLO ACOSTA JORGE', matricula: '2132842' },
        { nombre: 'DAVILA GONZALEZ ALDO ADRIAN', matricula: '1994122' },
        { nombre: 'DURAN BARRIENTOS FABRIZIO', matricula: '2018230' },
        { nombre: 'FLORES GONZALEZ SEBASTIAN', matricula: '21045641' },
        { nombre: 'DURAN BARRIENTOS FABRIZIO', matricula: '20182301' },
        { nombre: 'FLORES GONZALEZ SEBASTIAN', matricula: '2104564' },
        { nombre: 'FLORES LÓPEZ DIEGO', matricula: '2066033' },
        { nombre: 'FLORES MARTINEZ ERICK ADRIAN', matricula: '2132976' },
        { nombre: 'GARZA AVALOS DIEGO', matricula: '2066114' },
        { nombre: 'GONZALEZ OVALLE CHRISTIAN GABRIEL', matricula: '2031243' },
        { nombre: 'GRANJA PEÑA DIEGO', matricula: '20647331' },
        { nombre: 'IBARRA RODRIGUEZ ALEXIS', matricula: '20312431' },
        { nombre: 'MARTINEZ ELIAS ANGEL SEBASTIAN', matricula: '2064733' },
        { nombre: 'MENDIETA GONZALEZ ESMERALDA GABRIELA', matricula: '2094647' },
        { nombre: 'MIRELES VELAZQUEZ ALEJANDRO', matricula: '2005102' },
        { nombre: 'MONSIVAIS SALAZAR ANDRES', matricula: '2064574' },
        { nombre: 'PARRAZALEZ VALDESPINO MARTHA JULIETA', matricula: '2024783' },
        { nombre: 'PEÑA MUNGARRO LUIS ANGEL', matricula: '2066077' },
        { nombre: 'PUENTE REYNOSO JULIO CESAR', matricula: '2092151' },
        { nombre: 'RAMIREZ LOPEZ BRYAN', matricula: '2103708' },
        { nombre: 'RAMOS AVILA LILIANA VALERIA', matricula: '2115192' },
        { nombre: 'RICO JAUREGUI MAURICIO', matricula: '2037503' },
        { nombre: 'RIVERA LUNA ADRIAN', matricula: '2131513' },
        { nombre: 'RIVERA REYNA JOSE EMILIO', matricula: '2013503' },
        { nombre: 'RODRIGUEZ OLVERA ROSA ISELA', matricula: '2004613' },
        { nombre: 'RODRIGUEZ RODRIGUEZ ANGEL AZAEL', matricula: '2133022' },
        { nombre: 'SANCHEZ GALARZA JUAN CARLOS', matricula: '2026061' },
        { nombre: 'SOLIS ORTIZ ALFREDO', matricula: '2095320' },
        { nombre: 'VELAZQUEZ ABREGO HERWIN DANIEL', matricula: '2025350' },
        { nombre: 'VILLAGRA RODRIGUEZ ANDRES NEHUEL', matricula: '2103895' },
        { nombre: 'ZACATENCO OLIVE RODRIGO', matricula: '1857791' },
        { nombre: 'ZAVALA CANTU TERESA MARGARITA', matricula: '2025218' }
      ]);
    }, 2000);
  }, []);

  const alumnosFiltrados = alumnos
    .filter(alumno =>
      alumno.nombre.toLowerCase().includes(buscaAlumno.toLowerCase()) ||
      alumno.matricula.includes(buscaAlumno)
    )
    .sort((a, b) => {
      let strA = a.nombre;
      let strB = b.nombre;

      if (tipoOrden.includes('nombre')) {
        strA = a.nombre.split(' ').slice(2).join(' ') || a.nombre;
        strB = b.nombre.split(' ').slice(2).join(' ') || b.nombre;
      }

      if (tipoOrden.includes('asc')) {
        return strA.localeCompare(strB);
      } else {
        return strB.localeCompare(strA);
      }
    });

  if (!alumnos.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <Text style={{ color: 'white' }}>Cargando alumnos...</Text>
      </View>
    );
  }

  if (alumnos.length === 0) {
    return (
      <Text> No hay alumnos</Text>
    );
  }

  return (
    //Op 1
    // <TextInput placeholder="hola..."></TextInput> de React native y <TextInput> de Paper no se pueden usar juntos
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 10, paddingTop: 40 }}>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <Searchbar
          placeholder="Buscar alumno..."
          onChangeText={setBuscaAlumno}
          value={buscaAlumno}
          style={{ flex: 1, marginRight: 10 }} 
        />
        
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ padding: 5 }}>
              <MaterialIcons 
                name="keyboard-arrow-down" 
                size={32} 
                color="white" 
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => { setTipoOrden('apellido_asc'); setMenuVisible(false); }} title="Apellido (A-Z)" />
          <Menu.Item onPress={() => { setTipoOrden('apellido_desc'); setMenuVisible(false); }} title="Apellido (Z-A)" />
          <Menu.Item onPress={() => { setTipoOrden('nombre_asc'); setMenuVisible(false); }} title="Nombre (A-Z)" />
          <Menu.Item onPress={() => { setTipoOrden('nombre_desc'); setMenuVisible(false); }} title="Nombre (Z-A)" />
        </Menu>
      </View>
      
      <FlatList
        data={alumnosFiltrados}
        keyExtractor={(item) => item.matricula}
        renderItem={({ item }) => (
          <>
            <List.Item
              title={item.nombre}
              description={item.matricula}
              titleStyle={{ color: 'white' }}
              descriptionStyle={{ color: '#aaa' }}
              left={props => <MaterialIcons {...props} name="account-circle" size={40} color="white" />}
            />
          </>
        )}
        ListEmptyComponent={() => (
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
            No se encontraron alumnos
          </Text>
        )}
      />
    </View>

    //Op 2: Map sin FlatList
    // alumnos.map((alumno) => (
      //     <List.Item key={alumno.matricula} title={alumno.nombre} left={props => <MaterialIcons name="account-circle" size={40}></MaterialIcons>}></List.Item>
    // ))
  );
}