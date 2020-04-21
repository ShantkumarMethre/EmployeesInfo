// import React from 'react';
// import {StyleSheet, Text, View, Button, Image} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import axios from 'axios';
// import RNFetchBlob from 'react-native-fetch-blob';
// import Firebase from '../service/firebase';

// export default class EmployesForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filePath: {},
//       data: [],
//       url: '',
//     };
//   }
//   chooseFile = async () => {
//     var options = {
//       title: 'Select Image',
//       customButtons: [
//         {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     var imageUri;

//     ImagePicker.showImagePicker(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         let source = response;
//         // You can also display the image using data:
//         // let source = { uri: 'data:image/jpeg;base64,' + response.data };

//         var currentImage = source;
//         const image = currentImage.uri;

//         const Blob = RNFetchBlob.polyfill.Blob;
//         const fs = RNFetchBlob.fs;
//         window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
//         window.Blob = Blob;

//         let uploadBlob = null;
//         const imageRef = Firebase.storage()
//           .ref('posts')
//           .child('test.jpg');
//         let mime = 'image/jpg';
//         fs.readFile(image, 'base64')
//           .then(data => {
//             return Blob.build(data, {type: `${mime};BASE64`});
//           })
//           .then(blob => {
//             uploadBlob = blob;
//             return imageRef.put(blob, {contentType: mime});
//           })
//           .then(() => {
//             uploadBlob.close();
//             return imageRef.getDownloadURL();
//           })
//           .then(url => {
//             // URL of the image uploaded on Firebase storage
//             console.log('image url..', url);
//             this.setState({url: url});
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       }
//     });
//   };
//   async componentDidMount() {
//     const URL = 'https://5e99d566bc561b0016af397d.mockapi.io/api/v1/employees';
//     const response = await axios.get(URL);
//     console.log('dtata is ..', response.data);
//     this.setState({data: response.data});
//   }

//   submit = async () => {
//     // uploadData.append('files', {
//     //   type: 'image/jpg',
//     //   uri: this.state.filePath.uri,
//     //   name: 'shant',
//     // });
//     // const file = {
//     //   uri: this.state.filePath.uri, // e.g. 'file:///path/to/file/image123.jpg'
//     //   name: 'shanr', // e.g. 'image123.jpg',
//     //   type: 'image/jpg', // e.g. 'image/jpg'
//     // };

//     // const body = new FormData();
//     // body.append('file', file);

//     // var photo = createFormData(this.state.filePath.uri, {userId: '123'});
//     await axios
//       .put('https://5e99d566bc561b0016af397d.mockapi.io/api/v1/employees/1', {
//         name: 'shanthaaaa',
//         avatar: this.state.url,
//       })
//       .then(function(response) {
//         console.log(response);
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           {/*<Image
//           source={{ uri: this.state.filePath.path}}
//           style={{width: 100, height: 100}} />*/}
//           {this.state.data.length > 0 ? (
//             <Image
//               source={{
//                 uri: this.state.data[0].avatar,
//               }}
//               style={{width: 100, height: 100}}
//             />
//           ) : (
//             <Image
//               source={{
//                 uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
//               }}
//               style={{width: 100, height: 100}}
//             />
//           )}
//           <Image
//             source={{uri: this.state.filePath.uri}}
//             style={{width: 250, height: 250}}
//           />
//           <Text style={{alignItems: 'center'}}>{this.state.filePath.uri}</Text>
//           <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
//           <Button title="Submit" onPress={this.submit.bind(this)} />
//         </View>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Button,
  Input,
  Label,
  Item,
  Content,
  Footer,
  FooterTab,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Firebase from '../service/firebase';

import {useForm} from 'react-hook-form';
import {
  createEmployees,
  startImageLoader,
  stopImageLoader,
} from '../action/employees';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loader from '../components/loader';

function EmployesForm(props) {
  var defaultValues = {
    FirstName: '',
    CompanyName: '',
    Email: '',
    Phone: '',
    Avatar: '',
  };
  const {register, handleSubmit, setValue, errors, getValues} = useForm();
  var valuesData = getValues();
  console.log('data is....acount', valuesData);

  const onSubmit = async data => {
    await props.createEmployees(data);
    props.navigation.navigate('Employes');
  };
  chooseFile = async () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    var imageUri;

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        props.startImageLoader();
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        var currentImage = source;
        const image = currentImage.uri;

        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        let uploadBlob = null;
        const imageRef = Firebase.storage()
          .ref('posts')
          .child('test.jpg');
        let mime = 'image/jpg';
        fs.readFile(image, 'base64')
          .then(data => {
            return Blob.build(data, {type: `${mime};BASE64`});
          })
          .then(blob => {
            uploadBlob = blob;
            return imageRef.put(blob, {contentType: mime});
          })
          .then(() => {
            uploadBlob.close();
            return imageRef.getDownloadURL();
          })
          .then(url => {
            // URL of the image uploaded on Firebase storage
            setValue('Avatar', url);

            console.log('image url..', url);
            props.stopImageLoader(url);
          })
          .catch(error => {
            console.log(error);
            props.stopImageLoader('');
          });
      }
    });
  };

  return (
    <SafeAreaView forceInset={{top: 'never', left: 'never'}} style={{flex: 1}}>
      <Container>
        {props.commonState.isLoading ? (
          <View>
            <Loader>
              <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={() => {}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#D9D7D7',
                    opacity: 0.7,
                  }}>
                  <View>
                    <ActivityIndicator />
                    <Text>Saving...</Text>
                  </View>
                </View>
              </Modal>
            </Loader>
          </View>
        ) : null}
        <Content>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Name*</Label>
            <Input
              placeholder={'Big Iron'}
              style={styles.input}
              value={valuesData.FirstName}
              name="FirstName"
              key="FirstName"
              ref={register(
                {name: 'FirstName'},
                {required: true, pattern: /[0-9a-zA-Z]{3,}/, minLength: 1},
              )}
              placeholder="FirstName"
              onChangeText={e => setValue('FirstName', e)}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.FirstName && 'Name is required'}
          </Text>

          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Company Name*</Label>

            <Input
              placeholder={'Desciption'}
              style={styles.input}
              name="CompanyName"
              key="CompanyName"
              ref={register(
                {name: 'CompanyName'},
                {required: true, pattern: /[0-9a-zA-Z]{1,25}/, minLength: 1},
              )}
              placeholder="CompanyName"
              onChangeText={e => setValue('CompanyName', e)}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.CompanyName && 'Company Name is required'}
          </Text>

          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Email*</Label>

            <Input
              placeholder={'None'}
              style={styles.input}
              keyboardType={'email-address'}
              name="Email"
              key="Email"
              autoCapitalize="none"
              ref={register(
                {name: 'Email'},
                {
                  required: true,
                  pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                },
              )}
              placeholder="Email"
              onChangeText={e => setValue('Email', e)}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.Email && valuesData.Email
              ? 'Email is not valid'
              : errors.Email && 'Email is required'}
          </Text>

          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Phone*</Label>
            <Input
              placeholder={'Desciption'}
              style={styles.input}
              keyboardType={'phone-pad'}
              name="Phone"
              key="Phone"
              maxLength={10}
              ref={register(
                {name: 'Phone'},
                {
                  required: true,
                  pattern: /^\(?\d{3}\)?\d{3}\d{4}$/,
                },
              )}
              placeholder="Phone"
              onChangeText={e => {
                setValue('Phone', e);
              }}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.Phone && valuesData.Phone
              ? 'Phone number is not valid'
              : errors.Phone && 'Phone number is required'}
          </Text>

          <View style={{height: 30}}>
            <TouchableOpacity onPress={chooseFile}>
              <Text>Click to choose photo</Text>
            </TouchableOpacity>
          </View>

          {/* <Button onPress={chooseFile}>
            <Text style={styles.footerText}>Save</Text>
          </Button> */}
        </Content>
        <Footer style={styles.footer}>
          <FooterTab
            style={{
              backgroundColor: 'white',
              elevation: 0,
              borderWidth: 0,
              borderColor: 'white',
            }}>
            <Button
              full={true}
              style={styles.footerLeftButton}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.footerText}>Save</Text>
            </Button>
            {/* <Button
              full={true}
              danger
              style={styles.footerRightButton}
              onPress={() => {
                this.props.navigation.navigate('Employes');
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Cancel</Text>
            </Button> */}
          </FooterTab>
        </Footer>
      </Container>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  errorText: {marginLeft: 10, color: 'red'},
  footer: {
    marginBottom: 10,
    backgroundColor: 'white',
    elevation: 0,
    borderWidth: 0,
    borderColor: 'white',
  },
  footerLeftButton: {
    backgroundColor: 'rgb(255,217,25)',
    marginRight: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  footerRightButton: {
    backgroundColor: '#404040',
    marginRight: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  footerText: {color: 'black', fontWeight: 'bold'},
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  rightView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
  input: {color: 'black'},
  item: {marginLeft: 10, marginTop: 20},
  label: {color: 'grey', marginLeft: 5},
  titleView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  console.log('state is...', state);
  return {
    employees: state.employees,
    commonState: state.common,
  };
};

export default connect(
  mapStateToProps,
  {createEmployees, startImageLoader, stopImageLoader},
)(EmployesForm);
