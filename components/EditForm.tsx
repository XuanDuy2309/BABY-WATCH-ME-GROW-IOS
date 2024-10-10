import { View, Text, ScrollView, Image, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import images from '@/assets/images';
// import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from '@/context/GlobalProvider';
import { getHisUpload, uploadImage } from '@/service/image';
import Loader from './Loader';
import * as FileSystem from 'expo-file-system';
import { ImagePickerOptions } from 'expo-image-picker';
import { changePassword, deleteAccount } from '@/service/auth';



const EditForm = ({ isOpen, handleClose, handleUploadFace }: { isOpen: boolean, handleClose: () => void, handleUploadFace: (img: any) => void }) => {
    const { user, handleDeleteAccount, handleSignOut } = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [action, setAction] = useState('upload');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        new_password: "",
        confirm_new_password: "",
    });
    const [delPass, setDelPass] = useState('');

    const handleInput = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleChangePassword = async () => {
        if (formData.password === "" || formData.new_password === "" || formData.confirm_new_password === "") {
            alert("Please fill in all fields");
            return;
        }
        if (formData.password === formData.new_password) {
            alert("New password and old password not match");
            return;
        }

        if (formData.new_password !== formData.confirm_new_password) {
            alert("New password and confirm new password not match");
            return;
        }
        setLoading(true);
        try {
            const form = new FormData();
            form.append("old_password", formData.password);
            form.append("new_password", formData.new_password);
            const result = await changePassword(form, user);
            if (result.data.message) {
                alert(result.data.message);
                setLoading(false);
                return;
            }
            alert("Change password success");
            handleClose();
            setLoading(false);
        } catch (error) {
            alert("Change password failed");
            console.log(error);
            setLoading(false);
        }
    }



    const openPicker = async () => {
        const result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setLoading(true);
            // console.log(result.assets[0]);
            const formData = new FormData();

            formData.append('src_img', {
                uri: result.assets[0].uri,
                type: result.assets[0].type,
                name: 'image.jpg',
            } as any);
            // console.log("formData", formData);
            try {
                const result = await uploadImage(formData, user);
                if (result.data.message) {
                    alert(result.data.message);
                    setLoading(false);
                    handleClose();
                    return;
                }
                handleUploadFace(result.data);
                handleClose();
                setLoading(false);

            } catch (err) {
                alert(err);
                console.log(err);
                setLoading(false);
            }


        } else {
            setTimeout(() => {
                Alert.alert("Document picked", JSON.stringify(result, null, 2));
            }, 100);
        }
    };


    const fetchData = async () => {
        if (user) {
            try {
                setLoading(true);
                const res = await getHisUpload(user.id_user);
                setData(res.data.image_links_video);
                // console.log(res.data.image_links_video);
                setLoading(false);
            } catch (err) {
                alert(err);
                setLoading(false);
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, []);
    if (isOpen && action === 'upload') {
        return (
            <View className='w-full h-full justify-center items-center  absolute top-0 left-0 right-0'>
                <View className='w-full h-fit bg-white mt-6 p-4 border rounded-3xl'>
                    <View className='flex-row justify-between'>
                        <Text className='text-2xl font-bold'>{"Edit Profile"}</Text>
                        <TouchableOpacity onPress={handleClose}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>

                    </View>
                    {
                        data.length > 0 ? <ScrollView horizontal className='mt-4'>
                            {data.map((item, index) => {
                                return (
                                    <TouchableOpacity className='w-[180px] h-[270px] mr-4 rounded-lg overflow-hidden'
                                        key={index}
                                        onPress={() => {
                                            handleUploadFace(item);
                                            handleClose();
                                        }}>
                                        <Image source={{ uri: item }} className='w-full h-full object-cover' />
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView> : <View className='w-full h-[270px] justify-center items-center'>
                            <Text>No photo yet!</Text>
                            <Text>Pls add new face!</Text>
                        </View>

                    }



                    <TouchableOpacity className='w-full justify-center items-center mt-4 p-4 bg-[#FF7991] rounded-xl'
                        onPress={() => {
                            openPicker();
                        }}
                    >
                        <Text className='text-lg text-white font-bold'>{"Add Face"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-full justify-center items-center mt-4 p-4 bg-[#FF7991] rounded-xl'
                        onPress={() => {
                            setAction('changePass');
                        }}
                    >
                        <Text className='text-lg text-white font-bold'>{"Change Password"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-full justify-center items-center mt-4 p-4 bg-[#FF7991] rounded-xl'
                        onPress={() => {
                            setAction('delete');
                        }}
                    >
                        <Text className='text-lg text-white font-bold'>{"Delete Account"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-full justify-center items-center mt-4 p-4 bg-[#FF7991] rounded-xl'
                        onPress={() => {
                            Alert.alert("Sign Out", "Are you sure you want to sign out?", [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                { text: "OK", onPress: () => handleSignOut() }
                            ])
                        }}
                    >
                        <Text className='text-lg text-white font-bold'>{"Sign Out"}</Text>
                    </TouchableOpacity>

                </View>
                <Loader isLoading={loading} />
            </View>

        )

    }
    if (isOpen && action === 'changePass') {
        return (
            <View className='w-full h-full justify-center items-center  absolute top-0 left-0 right-0'>
                <View className='w-full h-fit bg-white mt-6 p-4 border rounded-3xl'>
                    <View className='flex-row justify-between'>
                        <Text className='text-2xl font-bold'>{"Change Password"}</Text>
                        <TouchableOpacity onPress={handleClose}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>

                    </View>

                    <View className="flex-col w-full justify-start items-center">

                        <TextInput
                            onChangeText={(text) => handleInput("password", text)}
                            placeholder="Old Password"
                            secureTextEntry={true}
                            placeholderTextColor={"#ccc"}
                            className="text-black text-xl border rounded-lg mt-4 w-4/5 h-12 px-4 items-center"

                        />
                        <TextInput
                            onChangeText={(text) => handleInput("new_password", text)}
                            placeholder="New Password"
                            secureTextEntry={true}
                            placeholderTextColor={"#ccc"}
                            className="text-black text-xl border rounded-lg mt-4 w-4/5 h-12 px-4 items-center"

                        />
                        <TextInput
                            onChangeText={(text) => handleInput("confirm_new_password", text)}
                            placeholder="Confirm New Password"
                            secureTextEntry={true}
                            placeholderTextColor={"#ccc"}
                            className="text-black text-xl border rounded-lg mt-4 w-4/5 h-12 px-4 items-center"

                        />
                    </View>






                    <TouchableOpacity className='w-full justify-center items-center mt-4 p-4 bg-[#FF7991] rounded-xl'
                        onPress={() => {
                            handleChangePassword();
                            handleClose();
                        }}
                    >
                        <Text className='text-lg text-white font-bold'>{"Save"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-full justify-center items-center mt-4 p-4 bg-[#FF7991] rounded-xl'
                        onPress={() => {
                            setAction('upload');

                        }}
                    >
                        <Text className='text-lg text-white font-bold'>{"Cancel"}</Text>
                    </TouchableOpacity>

                </View>
                <Loader isLoading={loading} />
            </View>

        )
    }
    if (isOpen && action === 'delete') {
        return (
            <View className='w-full h-full justify-center items-center  absolute top-0 left-0 right-0'>
                <View className='w-full h-fit bg-white mt-6 p-4 border rounded-3xl'>
                    <View className='flex-row justify-between'>
                        <Text className='text-2xl font-bold'>{"Delete Account"}</Text>
                        <TouchableOpacity onPress={handleClose}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>

                    </View>

                    <View className="flex-col w-full justify-start items-center">

                        <TextInput
                            onChangeText={(text) => setDelPass(text)}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor={"#ccc"}
                            className="text-black text-xl border rounded-lg mt-4 w-4/5 h-12 px-4 items-center"

                        />

                        <TouchableOpacity className='w-full justify-center items-center mt-4 p-4 bg-[#FF7991] rounded-xl'
                            onPress={() => {
                                handleDeleteAccount(delPass);
                                handleClose();
                            }}
                        >
                            <Text className='text-lg text-white font-bold'>{"Save"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='w-full justify-center items-center mt-4 p-4 bg-[#FF7991] rounded-xl'
                            onPress={() => {
                                setAction('upload');

                            }}
                        >
                            <Text className='text-lg text-white font-bold'>{"Cancel"}</Text>
                        </TouchableOpacity>

                    </View>
                    <Loader isLoading={loading} />
                </View>
            </View>
        )

    }

    return <></>
}

export default EditForm