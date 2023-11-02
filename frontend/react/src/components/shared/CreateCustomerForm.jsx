import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {saveCustomer} from "../../services/client.js";
import {successNotification, errorNotification} from "../../services/notification.js";

const MyTextInput = ({label, ...props}) => {

    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)

    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status="error" mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const MySelect = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status="error" mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

// And now we can use these

const CreateCustomerForm = ({ onSuccess }) => {
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    age: 0,
                    gender: '',
                    password: ''
                }}
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
                    password: Yup.string()
                        .min(4, 'Debe contener más de 4 caracteres')
                        .max(15, 'Debe contener un máximo de 15 caracteres')
                        .required('La contraseña es requerida'),
                    gender: Yup.string()
                        .oneOf(
                            ['MALE', 'FEMALE'],
                            'El género utilizado no está disponible'
                        )
                        .required('El género es requerido'),
                })}
                onSubmit={(customer, {setSubmitting}) => {
                    setSubmitting(true);
                    saveCustomer(customer)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "Éxito",
                                `El usuario ${customer.name} ha sido creado`
                            )
                            onSuccess(res.headers["authorization"]);
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
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack mt={15} spacing={15}>
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
                                placeholder="nombre.apellido@gmail.com"
                            />

                            <MyTextInput
                                label="Edad"
                                name="age"
                                type="number"
                                placeholder="25"
                            />

                            <MyTextInput
                                label="Contraseña"
                                name="password"
                                type="password"
                                placeholder={"Ingresa una contraseña"}
                            />

                            <MySelect label="Género" name="gender">
                                <option value="">Selecciona una opción</option>
                                <option value="MALE">Masculino</option>
                                <option value="FEMALE">Femenino</option>
                            </MySelect>

                            <Button disabled={!isValid || isSubmitting} type="submit">Enviar</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateCustomerForm;