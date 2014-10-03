((function (window, $) {

    function estadoBR(uf)
    {
        var estado;
        var obj = {
            'AC': 'Acre',
            'AL': 'Alagoas',
            'AM': 'Amazonas',
            'AP': 'Amapá',
            'BA': 'Bahia',
            'CE': 'Ceará',
            'DF': 'Distrito Federal',
            'ES': 'Espírito Santo',
            'GO': 'Goiás',
            'MA': 'Maranhão',
            'MT': 'Mato Grosso',
            'MS': 'Mato Grosso do Sul',
            'MG': 'Minas Gerais',
            'PA': 'Pará',
            'PB': 'Paraíba',
            'PR': 'Paraná',
            'PE': 'Pernambuco',
            'PI': 'Piauí',
            'RJ': 'Rio de Janeiro',
            'RN': 'Rio Grande do Norte',
            'RO': 'Rondônia',
            'RS': 'Rio Grande do Sul',
            'RR': 'Roraima',
            'SC': 'Santa Catarina',
            'SE': 'Sergipe',
            'SP': 'São Paulo',
            'TO': 'Tocantins'
        };
        jQuery.each(obj, function(key, value) {
            if (key == uf) {
                estado = value;
            }
        });

        return estado;
    }

    function field(selector, fallbackSelector)
    {
        var $element = (e = $(selector), e = (e.length) ? e : $(fallbackSelector), e);

        if ( ! $element.length) {
            return false;
        }

        return $element;
    }

    $(document).ready(function () {
        var $cep = $('[data-cep]');
        if ( ! $cep.length) {
            $cep = $('[name*="postcode"]');
            if ( ! $cep.length) {
                console.log('cep input not found');
                return;
            }
        }

        $cep.each(function () {
            var $form = $(this).parents('form');

            var $uf = $form.find('[data-uf]');
            if ( ! $uf.length) {
                $uf = $form.find('[name*="region_id"]');
            }

            var $rua = $form.find('[data-rua]');
            if ( ! $rua.length) {
                $rua = $form.find('[name*="[street][]"]');
                if ( ! $rua.length) {
                    console.log('rua input not found');
                    return;
                }
            }

            var $cidade = $form.find('[data-cidade]');
            if ( ! $cidade.length) {
                $cidade = $form.find('[name*="city"]');
            }

            var $bairro = $form.find('[data-bairro]');

            var $focus = $form.find('[data-focus]');

            $(this).on('change', function () {
                $.getScript('/buscacep?cep='+ $(this).val(), function () {
                    if (resultadoCEP["resultado"] != 0) {
                        $rua.val(unescape(resultadoCEP["tipo_logradouro"]) +" "+ unescape(resultadoCEP["logradouro"]));

                        if ($cidade.length) {
                            $cidade.val(unescape(resultadoCEP["cidade"]));
                        }

                        if ($bairro.length) {
                            $bairro.val(unescape(resultadoCEP["bairro"]));
                        }

                        if ($uf.length) {
                            $uf.find('option').each(function() {
                                if (this.text == estadoBR(unescape(resultadoCEP["uf"]))) {
                                        this.selected = true;
                                    }
                            });
                        }

                        if ($focus) {
                            $focus.focus();
                        }
                    } else {
                        // fail silently
                    }
                });
            });

        });
    });

})(window, jQuery));
