import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CategoriesModule } from './categories/categories.module';
import { SalesModule } from './sales/sales.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { StockMovementsService } from './stock-movements/stock-movements.service';

@Module({
  imports: [
    ProductsModule,
    SalesModule,
    CategoriesModule,
    SuppliersModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, StockMovementsService],
})
export class AppModule {}
