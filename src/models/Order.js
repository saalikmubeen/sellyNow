import moment from "moment";

class Order {
    constructor(id, orderItems, totalAmount, date) {
        this.id = id;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get readableDate() {
    //   return this.date.toLocaleDateString('en-EN', {
    //       year: 'numeric',
    //       month: 'long',
    //       day: 'numeric',
    //       hour: '2-digit',
    //       minute: '2-digit'
    //   });
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}

export default Order;