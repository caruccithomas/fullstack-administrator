import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Image, Input, Select, Stack, VStack} from "@chakra-ui/react";
import {customerProfilePictureUrl, saveCustomer, updateCustomer, uploadCustomerProfilePicture} from "../../services/client.js";
import {successNotification, errorNotification} from "../../services/notification.js";
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const MyTextInput = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const MyDropzone = ({ customerId, fetchCustomers }) => {
    const onDrop = useCallback(acceptedFiles => {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        uploadCustomerProfilePicture(
            customerId,
            formData
        ).then((res) => {
            successNotification("Éxito", "La imagen ha sido actualizada");
            console.log(res);
            fetchCustomers();
        }).catch((err) => {
            errorNotification("Error", "La imagen no pudo ser modificada");
            console.log(err);
        });
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop });
  
    return (
        <Box {...getRootProps()}
            w={'100%'}
            textAlign={'center'}
            border={'dashed'}
            borderColor={'gray.200'}
            borderRadius={'3xl'}
            p={6}
            rounded={'md'}
        >
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>¡Suelta la imagen aquí!</p> :
            <p>Arrastra y suelta una imagen aquí, o selecciona alguna desde el explorador de archivos</p>
        }
      </Box>
    )
}

// And now we can use these
const UpdateCustomerForm = ({ fetchCustomers, initialValues, customerId }) => {
    return (
        <>
            <VStack spacing={5} mb={5}>
                <Image 
                    borderRadius={'full'}
                    boxSize={'150px'}
                    objectFit={'cover'}
                    src={customerProfilePictureUrl(customerId)}
                />
                <MyDropzone
                    customerId={customerId}
                    fetchCustomers={fetchCustomers}
                />
            </VStack>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Debe contener menos de 15 caracteres')
                        .required('El nombre es requerido'),
                    email: Yup.string()
                        .email('Debe contener menos de 20 caracteres')
                        .required('El correo electrónico es requerido'),
                    age: Yup.number()
                        .min(16, 'Debes tener al menos 16 años de edad')
                        .max(100, 'Debes tener menos de 100 años de edad')
                        .required('La edad es requerida'),
                })}
                onSubmit={(updatedCustomer, {setSubmitting}) => {
                    setSubmitting(true);
                    updateCustomer(customerId, updatedCustomer)
                    console.log(updateCustomer)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "Éxito",
                                `El usuario ${updatedCustomer.name} ha sido actualizado`
                            )
                            fetchCustomers();
                        }).catch(err => {
                            console.log(err);
                            errorNotification(
                                err.code,
                                err.response.data.message
                            )
                    }).finally(() => {
                        setSubmitting(false);
                    })
                }}
            >
                {({isValid, isSubmitting, dirty}) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label="Nombre y apellido"
                                name="name"
                                type="text"
                                placeholder="Nombre Apellido"
                            />

                            <MyTextInput
                                label="Correo electrónico"
                                name="email"
                                type="email"
                                placeholder="nombre-apellido@gmail.com"
                            />

                            <MyTextInput
                                label="Edad"
                                name="age"
                                type="number"
                            />

                            <Button disabled={!(isValid && dirty) || isSubmitting} type="submit">Enviar</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default UpdateCustomerForm;