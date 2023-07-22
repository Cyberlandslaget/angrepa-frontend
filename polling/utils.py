def parse(status):
    status = status.strip()
    if status == "up":
        return 0
    elif status == "down":
        return 1
    elif status == "faulty":
        return 2
    elif status == "flag not found":
        return 3
    elif status == "recovering":
        return 4
    else:
        return -1