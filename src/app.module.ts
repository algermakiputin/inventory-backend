import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { StockMovementsService } from './stock-movements/stock-movements.service';
import { OrderItemService } from './order-item/order-item.service';

@Module({
  imports: [ProductsModule, CategoriesModule, SuppliersModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService, StockMovementsService, OrderItemService],
})
export class AppModule {}
