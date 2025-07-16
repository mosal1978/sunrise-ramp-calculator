#!/usr/bin/env python3
import bluetooth

NORMS = [
    ("DIN 18040", 6),
    ("\u00d6NORM B1600", 6),
    ("SIA 500", 6),
    ("EU 1528", 8),
]

def check_slope(slope: float):
    messages = []
    compliant = True
    for name, max_slope in NORMS:
        if slope <= max_slope:
            messages.append(f"{name}: OK (\u2264{max_slope}%)")
        else:
            messages.append(f"{name}: too steep (max {max_slope}%)")
            compliant = False
    return compliant, messages


def main():
    server_sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
    server_sock.bind(("", bluetooth.PORT_ANY))
    server_sock.listen(1)

    port = server_sock.getsockname()[1]
    bluetooth.advertise_service(
        server_sock,
        "RampServer",
        service_classes=[bluetooth.SERIAL_PORT_CLASS],
        profiles=[bluetooth.SERIAL_PORT_PROFILE],
    )

    print(f"Waiting for connection on RFCOMM channel {port}")
    client_sock, client_info = server_sock.accept()
    print("Accepted connection from", client_info)
    try:
        while True:
            data = client_sock.recv(1024)
            if not data:
                break
            msg = data.decode().strip()
            if msg.startswith("SLOPE"):
                try:
                    slope = float(msg.split()[1])
                except (IndexError, ValueError):
                    client_sock.send(b"ERR invalid slope")
                    continue
                compliant, messages = check_slope(slope)
                status = b"OK" if compliant else b"FAIL"
                response = status + b"|" + ";".join(messages).encode()
                client_sock.send(response)
            else:
                client_sock.send(b"ERR unknown command")
    except OSError:
        pass

    client_sock.close()
    server_sock.close()


if __name__ == "__main__":
    main()
