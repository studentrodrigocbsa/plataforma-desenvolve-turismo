import 'simple-notify/dist/simple-notify.css'

export enum TIPOS_NOTIFICACAO {
    SUCESSO = "success",
    ERRO = "error",
    AVISO = "warning",
    INFO = "info"
};

export class Notificacao{
    static async exibirNotificacao(mensagens: Array<string>, tipo: TIPOS_NOTIFICACAO){
        const { default: Notify } = await import('simple-notify');
        for(const m of mensagens){
            new Notify ({
                status: tipo,
                text: m,
                effect: 'fade',
                speed: 300,
                customClass: '',
                customIcon: '',
                showIcon: true,
                showCloseButton: true,
                autoclose: false,
                autotimeout: 3000,
                notificationsGap: undefined,
                notificationsPadding: undefined,
                type: 'outline',
                position: 'right top',
                customWrapper: '',
            });
        }
    }
}