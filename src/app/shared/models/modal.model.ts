export interface Modal {
    title?: string;
    text?: string;
    alert?: string;
    route?: string;
}

export const modalSuccess: Modal = {
    title: 'Sucesso',
    text: 'Operação realizada com sucesso.',
    alert: 'alert alert-success'
}

export const modalError: Modal = {
    title: 'Erro',
    text: 'Ocorreu um erro ao efetuar a operação. Por favor, tente novamente.',
    alert: 'alert alert-danger'
}

export const modalWarning: Modal = {
    title: 'Aviso',
    alert: 'alert alert-warning'
}