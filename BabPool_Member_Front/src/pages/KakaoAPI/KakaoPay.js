import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import axios from "axios";
import { useRoute } from '@react-navigation/native';

export default function KakaoPay () {
    const route = useRoute();
    const [kakaopay, setKakaoPay] = useState();
    const kakaoReadyRequest = route.params.kakaoReadyRequest;
    sessionStorage.setItem('payment', JSON.stringify(kakaoReadyRequest));
    useEffect(() => {
        const fetchinfor = async () => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_ROOT}/api/v1/payment/member/ready`,
                    kakaoReadyRequest, {
                }
                );
                setKakaoPay(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchinfor();
    }, []);

    useEffect(() => {
        if (kakaopay) {
            sessionStorage.setItem('tid', kakaopay.tid);
            window.location.href = kakaopay.next_redirect_pc_url;
        }
    }, [kakaopay]);
    return (
        <View>
            <Text>
                <div></div>
            </Text>
        </View>
    );
}