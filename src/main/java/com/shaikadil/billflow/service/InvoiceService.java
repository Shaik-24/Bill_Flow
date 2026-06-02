package com.shaikadil.billflow.service;

import com.shaikadil.billflow.entity.Invoice;
import com.shaikadil.billflow.entity.Item;
import com.shaikadil.billflow.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository repo;

    public Invoice saveInvoice(Invoice invoice) {

        double subtotal = 0;

        for (Item item : invoice.getItems()) {

            double itemTotal =
                    item.getQuantity() * item.getUnitPrice();

            item.setTotalPrice(itemTotal);

            subtotal += itemTotal;
        }

        invoice.setTotalAmount(subtotal);

        double tax = Math.round(subtotal * 0.18 * 100.0) / 100.0;

        double finalAmount =
                Math.round((subtotal + tax) * 100.0) / 100.0;

        invoice.setTax(tax);

        invoice.setFinalAmount(finalAmount);

        return repo.save(invoice);
    }

    public List<Invoice> getAllInvoices() {
        return repo.findAll();
    }

    public Invoice getInvoiceById(Long id) {

        return repo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Invoice Not Found"));
    }

    public Invoice updateInvoice(Long id, Invoice invoice) {

        Invoice existing = getInvoiceById(id);

        existing.setCustomerName(invoice.getCustomerName());
        existing.setDate(invoice.getDate());
        existing.setItems(invoice.getItems());

        return saveInvoice(existing);
    }

    public void deleteInvoice(Long id) {

        repo.deleteById(id);
    }
}