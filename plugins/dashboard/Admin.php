<?php

namespace Plugins\Dashboard;

use Systems\AdminModule;
use Systems\Lib\HttpRequest;

class Admin extends AdminModule
{

    public function navigation()
    {
        return [
            'Main' => 'main'
        ];
    }

    public function getMain()
    {

        $this->_addHeaderFiles();
        $settings = htmlspecialchars_array($this->options('dashboard'));
        $stats['getVisities'] = number_format($this->countVisite(),0,'','.');
        $stats['getYearVisities'] = number_format($this->countYearVisite(),0,'','.');
        $stats['getMonthVisities'] = number_format($this->countMonthVisite(),0,'','.');
        $stats['getCurrentVisities'] = number_format($this->countCurrentVisite(),0,'','.');

        $day = array(
          'Sun' => 'AKHAD',
          'Mon' => 'SENIN',
          'Tue' => 'SELASA',
          'Wed' => 'RABU',
          'Thu' => 'KAMIS',
          'Fri' => 'JUMAT',
          'Sat' => 'SABTU'
        );
        $hari=$day[date('D',strtotime(date('Y-m-d')))];

        return $this->draw('dashboard.html', [
          'stats' => $stats,
          'pasien' => $this->db('pasien')->join('penjab', 'penjab.kd_pj = pasien.kd_pj')->desc('tgl_daftar')->limit('5')->toArray(),
          'dokter' => $this->db('dokter')->join('spesialis', 'spesialis.kd_sps = dokter.kd_sps')->join('jadwal', 'jadwal.kd_dokter = dokter.kd_dokter')->where('jadwal.hari_kerja', $hari)->where('status', '1')->group('dokter.kd_dokter')->rand()->limit('6')->toArray(),
        ]);

    }

    public function countVisite()
    {
        $record = $this->db('reg_periksa')
            ->select([
                'count' => 'COUNT(DISTINCT no_rawat)',
            ])
            ->oneArray();

        return $record['count'];
    }

    public function countYearVisite()
    {
        $record = $this->db('reg_periksa')
            ->select([
                'count' => 'COUNT(DISTINCT no_rawat)',
            ])
            ->like('tgl_registrasi', date('Y').'%')
            ->oneArray();

        return $record['count'];
    }

    public function countMonthVisite()
    {
        $record = $this->db('reg_periksa')
            ->select([
                'count' => 'COUNT(DISTINCT no_rawat)',
            ])
            ->like('tgl_registrasi', date('Y-m').'%')
            ->oneArray();

        return $record['count'];
    }

    public function countCurrentVisite()
    {
        $date = date('Y-m-d');
        $record = $this->db('reg_periksa')
            ->select([
                'count' => 'COUNT(DISTINCT no_rawat)',
            ])
            ->where('tgl_registrasi', $date)
            ->oneArray();

        return $record['count'];
    }

    public function poliChart()
    {

        $query = $this->db('reg_periksa')
            ->select([
              'count'       => 'COUNT(DISTINCT no_rawat)',
              'nm_poli'     => 'nm_poli',
            ])
            ->join('poliklinik', 'poliklinik.kd_poli = reg_periksa.kd_poli')
            ->where('tgl_registrasi', '>=', date('Y-m-d'))
            //->where('reg_periksa.kd_poli', '!=', 'U0041')
            ->group(['reg_periksa.kd_poli'])
            ->desc('nm_poli');


            $data = $query->toArray();

            $return = [
                'labels'  => [],
                'visits'  => [],
            ];

            foreach ($data as $value) {
                $return['labels'][] = $value['nm_poli'];
                $return['visits'][] = $value['count'];
            }

        return $return;
    }

    public function KunjunganTahunChart()
    {

        $query = $this->db('reg_periksa')
            ->select([
              'count'       => 'COUNT(DISTINCT no_rawat)',
              'label'       => 'tgl_registrasi'
            ])
            ->like('tgl_registrasi', date('Y').'%')
            ->group('EXTRACT(MONTH FROM tgl_registrasi)');

            $data = $query->toArray();

            $return = [
                'labels'  => [],
                'visits'  => []
            ];
            foreach ($data as $value) {
                $return['labels'][] = date("M", strtotime($value['label']));
                $return['visits'][] = $value['count'];
            }

        return $return;
    }

    public function RanapTahunChart()
    {

        $query = $this->db('reg_periksa')
            ->select([
              'count'       => 'COUNT(DISTINCT no_rawat)',
              'label'       => 'tgl_registrasi'
            ])
            ->where('stts', 'Dirawat')
            ->like('tgl_registrasi', date('Y').'%')
            ->group('EXTRACT(MONTH FROM tgl_registrasi)');

            $data = $query->toArray();

            $return = [
                'labels'  => [],
                'visits'  => []
            ];
            foreach ($data as $value) {
                $return['labels'][] = date("M", strtotime($value['label']));
                $return['visits'][] = $value['count'];
            }

        return $return;
    }

    public function RujukTahunChart()
    {

        $query = $this->db('reg_periksa')
            ->select([
              'count'       => 'COUNT(DISTINCT no_rawat)',
              'label'       => 'tgl_registrasi'
            ])
            ->where('stts', 'Dirujuk')
            ->like('tgl_registrasi', date('Y').'%')
            ->group('EXTRACT(MONTH FROM tgl_registrasi)');

            $data = $query->toArray();

            $return = [
                'labels'  => [],
                'visits'  => []
            ];
            foreach ($data as $value) {
                $return['labels'][] = date("M", strtotime($value['label']));
                $return['visits'][] = $value['count'];
            }

        return $return;
    }

    public function getJavascript()
    {
        header('Content-type: text/javascript');
        $settings = htmlspecialchars_array($this->options('dashboard'));
        $stats['poliChart'] = $this->poliChart();
        $stats['KunjunganTahunChart'] = $this->KunjunganTahunChart();
        $stats['RanapTahunChart'] = $this->RanapTahunChart();
        $stats['RujukTahunChart'] = $this->RujukTahunChart();
        $stats['tunai'] = $this->db('reg_periksa')->select(['count' => 'COUNT(DISTINCT no_rawat)'])->where('kd_pj', $settings['umum'])->like('tgl_registrasi', date('Y').'%')->oneArray();
        $stats['bpjs'] = $this->db('reg_periksa')->select(['count' => 'COUNT(DISTINCT no_rawat)'])->where('kd_pj', $settings['bpjs'])->like('tgl_registrasi', date('Y').'%')->oneArray();
        $stats['lainnya'] = $this->db('reg_periksa')->select(['count' => 'COUNT(DISTINCT no_rawat)'])->where('kd_pj', '!=', $settings['umum'])->where('kd_pj', '!=', $settings['bpjs'])->like('tgl_registrasi', date('Y').'%')->oneArray();
        echo $this->draw(MODULES.'/dashboard/js/app.js', ['stats' => $stats]);
        exit();
    }

    private function _addHeaderFiles()
    {
        $this->core->addJS(url([ADMIN, 'dashboard', 'javascript']), 'footer');
    }

}
