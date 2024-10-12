import { View, Text, Modal, ActivityIndicator } from 'react-native';
import React from 'react';

const ModalLoading = ({ isLoading }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isLoading}>
            <View
                className="flex-1 justify-center items-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View>
                    <ActivityIndicator size='large' />
                </View>
            </View>
        </Modal>
    );
};

export default ModalLoading;
