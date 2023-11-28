import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApexOptions } from 'apexcharts';
import { ReportState } from 'app/modules/reports/store';
import { loadAnalytics } from 'app/modules/reports/store/actions';
import { getAnalytics } from 'app/modules/reports/store/selectors';
import { DataQueryTimeSpan, ReportsAnalyticsDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-report-analytics',
    templateUrl: './report-analytics.component.html',
    styleUrls: ['./report-analytics.component.scss'],
})
export class ReportAnalyticsComponent implements OnInit {
    seriesTimeSpan: DataQueryTimeSpan = DataQueryTimeSpan.PastWeek;
    reportsChart: ApexOptions = {};
    data$: Observable<ReportsAnalyticsDto | null | undefined>;
    data: ReportsAnalyticsDto;

    constructor(private store: Store<ReportState>, private router: Router) {}

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.store.dispatch(loadAnalytics({ payload: this.seriesTimeSpan }));
        this.data$ = this.store.select(getAnalytics);
        this.data$.subscribe((data) => {
            this.data = data;
            this.prepareChartData();
        });

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                },
            },
        };
    }

    public get dataQueryTimeSpan(): typeof DataQueryTimeSpan {
        return DataQueryTimeSpan;
    }

    changeSeriesRange() {
        this.store.dispatch(loadAnalytics({ payload: this.seriesTimeSpan }));
    }

    prepareChartData() {
        // Github issues
        this.reportsChart = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            colors: ['#64748B', '#94A3B8'],
            dataLabels: {
                enabled: false,
            },
            grid: {
                borderColor: 'var(--fuse-border)',
            },
            legend: {
                show: false,
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%',
                },
            },
            series: [
                {
                    name: this.data?.name,
                    data: this.data?.dataPoints?.map((e) => [
                        new Date(e.date).getTime(),
                        e.value,
                    ]),
                },
            ],
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    },
                },
            },
            stroke: {
                width: [3, 0],
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
            },
            xaxis: {
                type: 'datetime',
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    color: 'var(--fuse-border)',
                },
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                labels: {
                    offsetX: -16,
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
            },
        };
    }

    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this.router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter((el) => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute(
                    'fill',
                    `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`
                );
            });
    }
}
