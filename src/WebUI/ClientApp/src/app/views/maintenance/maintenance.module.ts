import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaintenanceComponent } from 'app/views/maintenance/maintenance.component';
import { maintenanceRoutes } from 'app/views/maintenance/maintenance.routing';

@NgModule({
    declarations: [MaintenanceComponent],
    imports: [RouterModule.forChild(maintenanceRoutes)],
})
export class MaintenanceModule {}
