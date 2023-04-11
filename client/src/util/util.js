export const formatCurrentVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

export const typeOption = (text) => {
    if (text === 'longTerm') {
        return 'Gói Dài Hạn'
    } else {
        return 'Gói Ngắn Hạn'
    }
}

export const showStatus = (status) => {
    let text = '';

    switch (status) {
        case 'booking':
            text = 'Đang đợi Admin duyệt'
            break;
            case 'review':
                text = 'Đang đợi Booker duyệt'
                break;
            case 'cancel':
                text = 'Hợp đồng bị Hủy'
            break;
            case 'done':
                text = 'Xác Nhận Hợp Đồng'
                break;
    
        default:
            text = 'Đang đợi Booker Duyệt'
            break;
    }
    return text;
}

export const showOption = (option) => {
    let text = '';
    if (option == 'longTerm') {
        text = 'Dài hạn';
    } else {
        text = 'Ngắn hạn'
    }
    return text;
}


// khi moi dat
// booking

// booker duyet
// review

// cancel

// done

export const formatDate = (date) => {
    const now = new Date(date);
    const formattedDate = now.toLocaleString('en-US', { timeZone: 'UTC' });
    return formattedDate;
} 

export const truncate = (source, size) => {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }