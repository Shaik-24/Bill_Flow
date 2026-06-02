package com.shaikadil.billflow.repository;

import com.shaikadil.billflow.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}