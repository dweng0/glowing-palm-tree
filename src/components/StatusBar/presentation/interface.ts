interface onClickPayload {
    currentState: "connect" | "disconnect" | "transitioning"
}

export interface StatusBarBadgeProps {
    icon: () => any,
    color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined,
    label: string
}

export interface SocketSwitchProps  { 
    buttonState: "connect" | "disconnect" | "transitioning";
    onClick: () =>  void
}
