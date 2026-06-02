package com.shaikadil.billflow.controller;

import com.shaikadil.billflow.entity.Invoice;
import com.shaikadil.billflow.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin
public class InvoiceController {

    @Autowired
    private InvoiceService service;

    // Create Invoice
    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return service.saveInvoice(invoice);
    }

    // Get All Invoices
    @GetMapping
    public List<Invoice> getInvoices() {
        return service.getAllInvoices();
    }

    // Get Invoice By Id
    @GetMapping("/{id}")
    public Invoice getInvoice(@PathVariable Long id) {
        return service.getInvoiceById(id);
    }

    // Update Invoice
    @PutMapping("/{id}")
    public Invoice updateInvoice(
            @PathVariable Long id,
            @RequestBody Invoice invoice) {

        return service.updateInvoice(id, invoice);
    }

    // Delete Invoice
    @DeleteMapping("/{id}")
    public String deleteInvoice(@PathVariable Long id) {

        service.deleteInvoice(id);

        return "Invoice Deleted Successfully";
    }
}