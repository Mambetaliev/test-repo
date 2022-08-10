export interface IConfirmationModalProps {
    title?: string;
    setIsModalVisible: (vis: boolean) => void;
    cancelText?: string
    okText?: string
}