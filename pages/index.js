import React, { useState, useRef } from "react";
import Head from "next/head";
import { Image } from "react-bootstrap";
import styles from '../src/styles/pages/index.module.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { Knob } from 'primereact/knob';



const Index = () => {
    const [inputs, setInputs] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: "",
        input9: "",
        input10: "",
        input11: "",
        input12: "",
        input13: "",
        input14: "",
        input15: ""
    });
    console.log('inputs')
    const [data, setData] = useState({

    })

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const toast = useRef(null);

    const handleChange = (e, fieldName) => {
        setInputs(prevState => ({
            ...prevState,
            [fieldName]: e.target.value
        }));
        setErrors(prevState => ({
            ...prevState,
            [fieldName]: e.target.value ? "" : "Это поле обязательно"
        }));
    };

    const validateInputs = () => {
        const newErrors = {};
        Object.keys(inputs).forEach(key => {
            if (!inputs[key]) {
                newErrors[key] = "Это поле обязательно";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showErrorToast = (message) => {
        toast.current.show({ severity: 'error', summary: 'Ошибка', detail: message, life: 5000 });
    };

    const showSuccessToast = (message) => {
        toast.current.show({ severity: 'success', summary: 'Успех', detail: message, life: 5000 });
    };

    const load = async () => {
        if (!validateInputs()) {
            showErrorToast('Заполните все обязательные поля');
            return;
        }
        setLoading(true);
        try {
            // const response = await axios.post('https://localhost:5432/api/getAnalytic', inputs);
            const response = {
                data: {
                    prediction: "10",
                    classification: "C25",
                    therapy1: "Химиотерапия",
                    therapy2: "Радиотерапия"
                },
            }
            console.log(response.data);

            setData(response.data)
            setLoading(false);
            setSuccess(true);
            setInputs({
                input1: "",
                input2: "",
                input3: "",
                input4: "",
                input5: "",
                input6: "",
                input7: "",
                input8: "",
                input9: "",
                input10: "",
                input11: "",
                input12: "",
                input13: "",
                input14: "",
                input15: ""
            });
            showSuccessToast('Данные успешно отправлены');
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    const getKnobColor = (value) => {
        if (value >= 70) {
            return '#48BB78'; // Зеленый
        } else if (value >= 30 && value < 70) {
            return '#FFD700'; // Желтый
        } else {
            return '#FF0000'; // Красный
        }
    };

    return (
        <div>
            <Head>
                <link rel="icon" type={'png/img'} href={'/cancer.png'}/>
                <title>CancerAI</title>
                <link id="theme-link" rel="stylesheet" href="/themes/lara-light-blue/theme.css"></link>
            </Head>

            <Toast ref={toast} />

            <div className={styles.background}></div>
            <header className={styles.header}>
                <Image src='/cancer.png' height={48} width={48} className={styles.headerIcon}/>
                <span className={styles.headerText}>CancerAI</span>
            </header>

            <div className={styles.form}>
                {!success ? (
                    <>
                        <h3 className={styles.title}>Заполните данные о <br/> состоянии пациента</h3>

                        <div className={styles.wrapper}>
                            {[...Array(15)].map((_, index) => (
                                <div key={index} className={styles.inputBody}>
                                    <span className={styles.label}>Поле {index + 1}</span>
                                    <InputText value={inputs[`input${index + 1}`]} onChange={(e) => handleChange(e, `input${index + 1}`)} invalid={!!errors[`input${index + 1}`]} />
                                        {errors[`input${index + 1}`] && <small className={styles.errorMessage}>{errors[`input${index + 1}`]}</small>}
                                </div>
                            ))}
                            
                            <div className={styles.inputBody}>
                                <span className={styles.label}>Получить аналитику</span>
                                <Button label="Получить" icon="pi pi-check" loading={loading} onClick={load} />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.successMessage}>
                        <h3 className={styles.title}>Аналитика данных</h3>

                        <div className={styles.data}>
                            <Knob value={data.prediction} valueColor={getKnobColor(data.prediction)} readOnly  size={200} />
                            <div className={styles.predictionProcent}>
                                <h3 className={styles.prediction}>{data.prediction}%</h3>
                                <span>Вероятность ремисии</span>
                            </div>
                        </div>

                        <div className={styles.result}>
                            <div className={styles.resultSub}>
                                <h3 className={styles.resultSubTitle}>Рекомендуемый курс лечения:</h3>

                                <div className={styles.resultSubList}>
                                    <div className={styles.resultSubListItem}>
                                        <span className={styles.resultSubListItemTitle}>1-я терапия:</span>
                                        <span>{data.therapy1}</span>
                                    </div>
                                    <div className={styles.resultSubListItem}>
                                        <span className={styles.resultSubListItemTitle}>2-я терапия:</span>
                                        <span>{data.therapy2}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.resultSub}>
                                <h3 className={styles.resultSubTitle}>Вид заболевания:</h3>

                                <div className={styles.resultSubList}>
                                    <div className={styles.resultSubListItem}>
                                        <span className={styles.resultSubListItemTitle}>{data.classification}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default Index;
