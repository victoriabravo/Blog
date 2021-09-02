import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISpinnerConfig, SPINNER_ANIMATIONS, SPINNER_PLACEMENT } from '@hardpool/ngx-spinner';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements AfterViewInit, OnDestroy {
  
  loadingSubscription!: Subscription;
  spinnerConfig: ISpinnerConfig;
  showSpinner: boolean = false;
  constructor(
    private loadingScreenService: LoadingService,
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef

  ) {
    this.spinnerConfig = {
      placement: SPINNER_PLACEMENT.block_ui,
      animation: SPINNER_ANIMATIONS.spin_3,
      size: "3rem",
      color: "#28425E"
    }
  }

  ngAfterViewInit(): void {
    this.showSpinner = false;
    this.loadingSubscription = this.loadingScreenService.loading$.pipe().subscribe((status: boolean) => {
      this._elmRef.nativeElement.style.display = status ? this.showSpinner = true : this.showSpinner = false;
      this._changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
